// src/services/figma/figmaService.js

/**
 * Figma Service
 * Utilities for parsing Figma URLs and generating embed URLs
 */

/**
 * Parse a Figma URL to extract file ID, type, and other metadata
 * @param {string} url - Figma URL (file or prototype)
 * @returns {Object|null} - Parsed data or null if invalid
 */
export function parseFigmaUrl(url) {
    if (!url || typeof url !== 'string') return null;

    // Match file URLs: https://www.figma.com/file/FILE_ID/FILENAME
    const fileMatch = url.match(/figma\.com\/(?:design\/)?file\/([a-zA-Z0-9]+)/);

    // Match prototype URLs: https://www.figma.com/proto/FILE_ID/FILENAME
    const protoMatch = url.match(/figma\.com\/proto\/([a-zA-Z0-9]+)/);

    if (fileMatch) {
        return {
            type: 'file',
            fileId: fileMatch[1],
            isValid: true,
        };
    } else if (protoMatch) {
        return {
            type: 'proto',
            fileId: protoMatch[1],
            isValid: true,
        };
    }

    return null;
}

/**
 * Validate if a URL is a valid Figma URL
 * @param {string} url - URL to validate
 * @returns {boolean}
 */
export function isValidFigmaUrl(url) {
    const parsed = parseFigmaUrl(url);
    return parsed !== null && parsed.isValid;
}

/**
 * Generate an embed URL for Figma
 * @param {string} url - Original Figma URL
 * @returns {string|null} - Embed URL or null if invalid
 */
export function generateEmbedUrl(url) {
    const parsed = parseFigmaUrl(url);
    if (!parsed) return null;

    // Figma embed format
    const embedBase = 'https://www.figma.com/embed';
    const params = new URLSearchParams({
        embed_host: 'workflow-poc',
        url: url,
    });

    return `${embedBase}?${params.toString()}`;
}

/**
 * Extract file name from Figma URL
 * @param {string} url - Figma URL
 * @returns {string} - File name or 'Untitled'
 */
export function extractFileName(url) {
    if (!url) return 'Untitled';

    // Try to extract filename from URL
    const match = url.match(/figma\.com\/(?:file|proto)\/[^/]+\/([^?#]+)/);
    if (match && match[1]) {
        // Decode URI component and replace hyphens with spaces
        return decodeURIComponent(match[1]).replace(/-/g, ' ');
    }

    return 'Figma Design';
}

/**
 * Get a thumbnail URL for a Figma file (requires API key in production)
 * For POC, returns a placeholder
 * @param {string} fileId - Figma file ID
 * @returns {string} - Thumbnail URL
 */
export function getThumbnailUrl(fileId) {
    // In production, this would use Figma API:
    // TODO : integrate figma API here
    // https://api.figma.com/v1/images/${fileId}?ids=${nodeId}&format=png

    // For POC, return a placeholder or Figma logo
    return `https://via.placeholder.com/300x200/F24E1E/FFFFFF?text=Figma+Design`;
}
