import Foundation
import AVFoundation

let inputURL = URL(fileURLWithPath: "/Users/emanuelmesa/.gemini/antigravity/scratch/nfc-google-reviews-hero/media/raw_drive_video.mp4")
let outputVideoURL = URL(fileURLWithPath: "/Users/emanuelmesa/.gemini/antigravity/scratch/nfc-google-reviews-hero/media/nfc-hero-loop.mp4")
let outputPosterURL = URL(fileURLWithPath: "/Users/emanuelmesa/.gemini/antigravity/scratch/nfc-google-reviews-hero/media/nfc-hero-poster.png")

let asset = AVAsset(url: inputURL)

let semaphore = DispatchSemaphore(value: 0)

// 1. Generate poster frame
let imageGenerator = AVAssetImageGenerator(asset: asset)
imageGenerator.appliesPreferredTrackTransform = true
let time = CMTime(seconds: 0.5, preferredTimescale: 600)

do {
    let cgImage = try imageGenerator.copyCGImage(at: time, actualTime: nil)
    let bitmapRep = NSBitmapImageRep(cgImage: cgImage)
    if let pngData = bitmapRep.representation(using: .png, properties: [:]) {
        try pngData.write(to: outputPosterURL)
        print("Poster generated successfully at: \(outputPosterURL.path)")
    }
} catch {
    print("Poster generation warning: \(error)")
}

// 2. Export video without audio (video track only)
let composition = AVMutableComposition()
Task {
    do {
        let videoTracks = try await asset.loadTracks(withMediaType: .video)
        if let videoTrack = videoTracks.first {
            let compVideoTrack = composition.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid)
            let duration = try await asset.load(.duration)
            let timeRange = CMTimeRange(start: .zero, duration: duration)
            try compVideoTrack?.insertTimeRange(timeRange, of: videoTrack, at: .zero)
            compVideoTrack?.preferredTransform = try await videoTrack.load(.preferredTransform)
            
            if let exportSession = AVAssetExportSession(asset: composition, presetName: AVAssetExportPresetHighestQuality) {
                try? FileManager.default.removeItem(at: outputVideoURL)
                exportSession.outputURL = outputVideoURL
                exportSession.outputFileType = .mp4
                exportSession.shouldOptimizeForNetworkUse = true
                
                await exportSession.export()
                if exportSession.status == .completed {
                    print("Video exported without audio successfully at: \(outputVideoURL.path)")
                } else {
                    print("Export status: \(exportSession.status.rawValue), error: \(String(describing: exportSession.error))")
                }
            }
        }
    } catch {
        print("Composition error: \(error)")
    }
    semaphore.signal()
}

semaphore.wait()
