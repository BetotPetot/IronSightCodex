
import { useState } from 'react'
import { Link } from 'react-router-dom'

function CollectionDetail({ collection, onUpdateCollection, onDeleteCollection }) {
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState(null)

    if (!collection) {
        return (
            <section className="collection-section">
                <h2>COLLECTION NOT FOUND</h2>
                <p>The requested collection could not be found.</p>
            </section>
        )
    }

    function handleEdit() {
        setFormData({
            name: collection.name,
            origin: collection.origin,
            category: collection.category,
            description: collection.description,
            image: collection.image || '',
            isFeatured: collection.isFeatured ?? false,
        })

        setIsEditing(true)
    }

    function handleChange(event) {
        const { name, value } = event.target

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }))
    }

    async function handleSubmit(event) {
        event.preventDefault()

        const success = await onUpdateCollection(
            collection.id,
            formData
        )

        if (success) {
            setIsEditing(false)
        }
    }

    async function handleDelete() {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${collection.name}"?`
        )

        if (!confirmed) return

        await onDeleteCollection(collection.id)
    }

    return (
        <section className="collection-section">
            <div className="detail-actions">
                <Link to="/archive" className="button button-primary">
                    &larr; BACK TO ARCHIVE
                </Link>
            </div>

            {isEditing ? (
                <>
                    <div className="section-heading">
                        <h2>EDIT COLLECTION</h2>
                        <span>// UPDATE DOSSIER ENTRY</span>
                    </div>

                    <form
                        className="collection-form"
                        onSubmit={handleSubmit}
                    >
                        <div className="form-group">
                            <label htmlFor="edit-name">NAME</label>
                            <input
                                id="edit-name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                minLength={3}
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="edit-origin">ORIGIN</label>
                                <input
                                    id="edit-origin"
                                    name="origin"
                                    value={formData.origin}
                                    onChange={handleChange}
                                    minLength={2}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="edit-category">CATEGORY</label>
                                <select
                                    id="edit-category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="Rifle">Rifle</option>
                                    <option value="Handgun">Handgun</option>
                                    <option value="Shotgun">Shotgun</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="edit-description">
                                HISTORICAL BRIEFING / DESCRIPTION
                            </label>
                            <textarea
                                id="edit-description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                minLength={10}
                                required
                            />
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                className="button button-secondary"
                                onClick={() => setIsEditing(false)}
                            >
                                CANCEL
                            </button>

                            <button
                                type="submit"
                                className="button button-primary"
                            >
                                SAVE CHANGES
                            </button>
                        </div>
                    </form>
                </>
            ) : (
                <>
                    <div className="section-heading">
                        <h2>{collection.name}</h2>
                        <span>// COLLECTION DETAILS</span>
                    </div>

                    <div className="detail-actions">
                        <button
                            type="button"
                            className="button button-primary"
                            onClick={handleEdit}
                        >
                            EDIT COLLECTION
                        </button>

                        <button
                            type="button"
                            className="button button-secondary"
                            onClick={handleDelete}
                        >
                            DELETE COLLECTION
                        </button>
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
                </>
            )}
        </section>
    )
}

export default CollectionDetail
