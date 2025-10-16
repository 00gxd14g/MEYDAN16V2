#!/usr/bin/env node

/**
 * WebP Image Conversion Script
 *
 * Converts all JPG/PNG images in /assets/images to WebP format
 * Generates multiple sizes for responsive images
 * Maintains original files as backup
 *
 * Usage:
 *   node scripts/convert-images-to-webp.js
 */

import sharp from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuration
const INPUT_DIR = path.join(__dirname, '../assets/images')
const OUTPUT_DIR = path.join(__dirname, '../assets/images/webp')
const BACKUP_DIR = path.join(__dirname, '../assets/images/original')

// Responsive sizes
const SIZES = {
  mobile: 640,
  tablet: 1024,
  desktop: 1920,
}

// WebP quality
const QUALITY = 85

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true })
  } catch (error) {
    console.error(`Error creating directory ${dir}:`, error)
  }
}

async function convertImage(inputPath, filename) {
  try {
    const basename = path.basename(filename, path.extname(filename))
    const image = sharp(inputPath)
    const metadata = await image.metadata()

    console.log(`\n📸 Processing: ${filename}`)
    console.log(`   Original: ${metadata.width}x${metadata.height} - ${metadata.format}`)

    // Create backup
    const backupPath = path.join(BACKUP_DIR, filename)
    await fs.copyFile(inputPath, backupPath)
    console.log(`   ✅ Backup created: ${backupPath}`)

    // Convert to WebP at different sizes
    for (const [sizeName, width] of Object.entries(SIZES)) {
      // Skip if original is smaller than target size
      if (metadata.width < width && sizeName !== 'mobile') continue

      const outputFilename = `${basename}-${sizeName}.webp`
      const outputPath = path.join(OUTPUT_DIR, outputFilename)

      await sharp(inputPath)
        .resize(width, null, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: QUALITY })
        .toFile(outputPath)

      const stats = await fs.stat(outputPath)
      const sizeMB = (stats.size / 1024 / 1024).toFixed(2)
      console.log(`   ✅ ${sizeName}: ${outputFilename} (${sizeMB}MB)`)
    }

    // Also create a full-size WebP
    const fullOutputPath = path.join(OUTPUT_DIR, `${basename}.webp`)
    await sharp(inputPath)
      .webp({ quality: QUALITY })
      .toFile(fullOutputPath)

    const fullStats = await fs.stat(fullOutputPath)
    const fullSizeMB = (fullStats.size / 1024 / 1024).toFixed(2)
    console.log(`   ✅ full: ${basename}.webp (${fullSizeMB}MB)`)

    return true
  } catch (error) {
    console.error(`   ❌ Error converting ${filename}:`, error.message)
    return false
  }
}

async function main() {
  console.log('🚀 Starting WebP Conversion...\n')

  // Ensure directories exist
  await ensureDir(OUTPUT_DIR)
  await ensureDir(BACKUP_DIR)

  // Get all image files
  const files = await fs.readdir(INPUT_DIR)
  const imageFiles = files.filter((file) => {
    const ext = path.extname(file).toLowerCase()
    return ['.jpg', '.jpeg', '.png'].includes(ext)
  })

  if (imageFiles.length === 0) {
    console.log('No images found to convert.')
    return
  }

  console.log(`Found ${imageFiles.length} images to convert\n`)

  // Convert each image
  let successCount = 0
  for (const filename of imageFiles) {
    const inputPath = path.join(INPUT_DIR, filename)
    const success = await convertImage(inputPath, filename)
    if (success) successCount++
  }

  console.log(`\n✨ Conversion complete!`)
  console.log(`   ${successCount}/${imageFiles.length} images converted successfully`)
  console.log(`   WebP files: ${OUTPUT_DIR}`)
  console.log(`   Backups: ${BACKUP_DIR}`)
}

main().catch(console.error)
