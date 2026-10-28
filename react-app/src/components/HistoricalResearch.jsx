
import { useEffect, useState } from 'react'

function cleanSnippet(html) {
    const text = html
        .replace(/<[^>]*>/g, '')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()

    if (text.length <= 140) {
        return text
    }

    const shortened = text.slice(0, 180)
    const lastSentence = Math.max(
        shortened.lastIndexOf('. '),
        shortened.lastIndexOf('? '),
        shortened.lastIndexOf('! ')
    )

    if (lastSentence > 80) {
        return shortened.slice(0, lastSentence + 1)
    }

    return shortened.slice(0, shortened.lastIndexOf(' ')) + '...'
}

function HistoricalResearch() {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [retryCount, setRetryCount] = useState(0)

    useEffect(() => {
        async function fetchArticles() {
            setLoading(true)
            setError('')

            try {
                const response = await fetch(
                    'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=history%20of%20firearms&format=json&origin=*&srlimit=5'
                )

                if (!response.ok) {
                    throw new Error('Failed to fetch articles.')
                }

                const data = await response.json()
                setArticles(data.query.search)
            } catch {
                setError(
                    'Unable to retrieve historical records. Please try again.'
                )
            } finally {
                setLoading(false)
            }
        }

        fetchArticles()
    }, [retryCount])

    return (
        <section className="historical-research">
            <div className="section-heading">
                <h2>HISTORICAL RESEARCH FEED</h2>
                <span>// EXTERNAL KNOWLEDGE DATABASE</span>
            </div>

            {loading && (
                <div className="research-status">
                    <p>LOADING HISTORICAL RECORDS...</p>
                </div>
            )}

            {!loading && error && (
                <div className="research-status research-error">
                    <p>{error}</p>

                    <button
                        type="button"
                        className="button button-primary"
                        onClick={() => setRetryCount((count) => count + 1)}
                    >
                        RETRY ↻
                    </button>
                </div>
            )}

            {!loading && !error && (
                <div className="research-grid">

                    {articles.map((article) => (
                        <article className="research-card" key={article.pageid}>
                            <div className="research-card-meta">
                                WIKIPEDIA ARCHIVE
                            </div>

                            <h3>{article.title}</h3>

                            <p>{cleanSnippet(article.snippet)}</p>

                            <a
                                href={`https://en.wikipedia.org/?curid=${article.pageid}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                READ ARTICLE ↗
                            </a>
                        </article>
                    ))}

                </div>
            )}
        </section>
    )
}

export default HistoricalResearch
