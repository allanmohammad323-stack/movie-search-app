import React, { useEffect, useState } from 'react'
import styles from './media.module.css'

const Media = ({ mediaData }) => {
    const [activeTab, setActiveTab] = useState('posters')
    const [selectedMedia, setSelectedMedia] = useState(null)

    const posters = mediaData?.images?.posters || []
    const backdrops = mediaData?.images?.backdrops || []
    const videos = mediaData?.videos?.results || []

    const getCurrentMedia = () => {
        switch (activeTab) {
            case 'videos':
                return videos
            case 'backdrops':
                return backdrops
            case 'posters':
                return posters
            default:
                return posters
        }
    }

    const currentMedia = getCurrentMedia()

    // Close viewer with Escape
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setSelectedMedia(null)
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    const openMedia = (item, index) => {
        setSelectedMedia({
            item,
            index
        })
    }

    const closeMedia = () => {
        setSelectedMedia(null)
    }

    const showNext = () => {
        if (!selectedMedia) return
        const nextIndex = (selectedMedia.index + 1) % currentMedia.length
        setSelectedMedia({
            item: currentMedia[nextIndex],
            index: nextIndex
        })
    }

    const showPrevious = () => {
        if (!selectedMedia) return
        const previousIndex = (selectedMedia.index - 1 + currentMedia.length) % currentMedia.length
        setSelectedMedia({
            item: currentMedia[previousIndex],
            index: previousIndex
        })
    }

    return (
        <>
          

            <div className={styles.mediaSection}>
                <h2 className={styles.mediaTitle}>Media</h2>

                {/* Tabs */}
                <div className={styles.mediaTabs}>
                    <button
                        className={`${styles.tabBtn} ${
                            activeTab === 'videos' ? styles.active : ''
                        }`}
                        onClick={() => setActiveTab('videos')}
                    >
                        Videos
                        {videos.length > 0 && (
                            <span className={styles.count}>{videos.length}</span>
                        )}
                    </button>

                    <button
                        className={`${styles.tabBtn} ${
                            activeTab === 'backdrops' ? styles.active : ''
                        }`}
                        onClick={() => setActiveTab('backdrops')}
                    >
                        Backdrops
                        <span className={styles.count}>{backdrops.length}</span>
                    </button>

                    <button
                        className={`${styles.tabBtn} ${
                            activeTab === 'posters' ? styles.active : ''
                        }`}
                        onClick={() => setActiveTab('posters')}
                    >
                        Posters
                        <span className={styles.count}>{posters.length}</span>
                    </button>
                </div>

                {/* Media Grid */}
                <div className={styles.mediaGrid}>
                    {currentMedia.length === 0 ? (
                        <p className={styles.noMedia}>No media available.</p>
                    ) : (
                        currentMedia.slice(0, 8).map((item, index) => {
                            const isVideo = activeTab === 'videos'
                            const imageUrl = isVideo
                                ? `https://img.youtube.com/vi/${item.key}/hqdefault.jpg`
                                : `https://image.tmdb.org/t/p/w500${item.file_path}`

                            return (
                                <button
                                    type="button"
                                    key={`${activeTab}-${item.id || item.file_path || item.key}-${index}`}
                                    className={styles.mediaItem}
                                    onClick={() => openMedia(item, index)}
                                >
                                    <img
                                        src={imageUrl}
                                        alt={
                                            isVideo
                                                ? item.name || `Video ${index + 1}`
                                                : `${activeTab} ${index + 1}`
                                        }
                                        className={styles.mediaImage}
                                        loading="lazy"
                                        decoding="async"
                                    />

                                    {isVideo && (
                                        <div className={styles.playOverlay}>
                                            <span className={styles.playIcon}>▶</span>
                                        </div>
                                    )}

                                    {isVideo && item.name && (
                                        <div className={styles.videoTitle}>
                                            {item.name}
                                        </div>
                                    )}
                                </button>
                            )
                        })
                    )}
                </div>
            </div>

            {/* ============================== */}
            {/* MEDIA VIEWER - FIXED VERSION */}
            {/* ============================== */}
            {selectedMedia && (
                <div
                    className={styles.mediaViewer}
                    onClick={closeMedia}
                >
                    {/* Content Container */}
                    <div
                        className={styles.viewerContent}
                        onClick={(event) => event.stopPropagation()}
                    >
                        {/* Close Button - Now inside viewerContent */}
                        <button
                            type="button"
                            className={styles.closeButton}
                            onClick={closeMedia}
                            aria-label="Close media viewer"
                        >
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            >
                                <path d="M18 6L6 18" />
                                <path d="M6 6L18 18" />
                            </svg>
                        </button>

                        {activeTab === 'videos' ? (
                            <div className={styles.videoContainer}>
                                <iframe
                                    src={`https://www.youtube.com/embed/${selectedMedia.item.key}?autoplay=1`}
                                    title={selectedMedia.item.name || 'Movie video'}
                                    className={styles.videoPlayer}
                                    loading="lazy"
                                    allow="
                                        autoplay;
                                        encrypted-media;
                                        picture-in-picture;
                                        fullscreen
                                    "
                                    allowFullScreen
                                />
                                <h3 className={styles.viewerTitle}>
                                    {selectedMedia.item.name}
                                </h3>
                            </div>
                        ) : (
                            <img
                                src={`https://image.tmdb.org/t/p/original${selectedMedia.item.file_path}`}
                                alt={`${activeTab} ${selectedMedia.index + 1}`}
                                className={styles.fullImage}
                            />
                        )}
                    </div>

                    {/* Navigation Buttons */}
                    {currentMedia.length > 1 && (
                        <>
                            <button
                                type="button"
                                className={`${styles.viewerButton} ${styles.previousButton}`}
                                onClick={(event) => {
                                    event.stopPropagation()
                                    showPrevious()
                                }}
                            >
                                ‹
                            </button>
                            <button
                                type="button"
                                className={`${styles.viewerButton} ${styles.nextButton}`}
                                onClick={(event) => {
                                    event.stopPropagation()
                                    showNext()
                                }}
                            >
                                ›
                            </button>
                        </>
                    )}
                </div>
            )}
        </>
    )
}

export default Media