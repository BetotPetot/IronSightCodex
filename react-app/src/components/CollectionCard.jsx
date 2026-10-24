import { Link } from 'react-router-dom'

function CollectionCard({ collection }) {
    return (
        <article className="collection-card">
            {collection.image && (
                <img
                    className="card-image"
                    src={collection.image}
                    alt={collection.name}
                />
            )}

            <div className="card-content">
                <h3>{collection.name}</h3>

                <p>{collection.description}</p>
            </div>

            <div className="card-footer">
                <span>ORIGIN: {collection.origin}</span>

                <Link 
                    to={`/archive/${collection.id}`}
                    className="button button-primary"
                >
                    VIEW DETAILS &rarr;
                </Link>
            </div>
        </article>
    )
}

export default CollectionCard
