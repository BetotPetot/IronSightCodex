import { Link } from 'react-router-dom'

function CollectionDetail({ collection }) {
    if (!collection) {
        return (
            <section className="collection-section">
                <h2>COLLECTION NOT FOUND</h2>
                <p>The requested collection could not be found.</p>
            </section>
        )
    }

    return (
        <section className="collection-section">

            <Link to="/archive" className="button button-primary">
                &larr; BACK TO ARCHIVE
            </Link>

            <div className="section-heading">
                <h2>{collection.name}</h2>
                <span>// COLLECTION DETAILS</span>
            </div>

            {collection.image && (
                <img
                    src={collection.image}
                    alt={collection.name}
                    className="detail-image"
                />
            )}

            <div className="detail-info">
                <p>
                    <strong>Origin:</strong> {collection.origin}
                </p>

                <p>
                    <strong>Category:</strong> {collection.category}
                </p>

                <p>
                    <strong>Historical Briefing:</strong>
                </p>

                <p>{collection.description}</p>
            </div>
        </section>
    )
}

export default CollectionDetail
