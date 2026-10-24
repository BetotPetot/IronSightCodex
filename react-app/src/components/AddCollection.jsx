
import { useState } from 'react'

function AddCollection({ onAddCollection }) {
    const [formData, setFormData] = useState({
        name: '',
        origin: '',
        category: '',
        description: '',
    })

    const [imageFile, setImageFile] = useState(null)
    const [imagePreview, setImagePreview] = useState('')

    function handleChange(event) {
        const { name, value } = event.target

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }))
    }

    function handleCancel() {
        setFormData({
            name: '',
            origin: '',
            category: '',
            description: '',
        })

        setImageFile(null)
        setImagePreview('')

        const imageInput = document.getElementById('image')
        if (imageInput) imageInput.value = ''
    }

    function handleSubmit(event) {
        event.preventDefault()

        if (
            !formData.name.trim() ||
            !formData.origin.trim() ||
            !formData.category ||
            !formData.description.trim()
        ) {
            alert('Please fill in all required fields.')
            return
        }

        const imageUrl = imageFile
            ? URL.createObjectURL(imageFile)
            : ''

        onAddCollection({
            ...formData,
            image: imageUrl,
        })

        setFormData({
            name: '',
            origin: '',
            category: '',
            description: '',
        })

        setImageFile(null)
        setImagePreview('')

        const imageInput = document.getElementById('image')
        if (imageInput) imageInput.value = ''
    }

    return (
        <section className="codex-card add-collection">
            <div className="section-heading">
                <div>
                    <h2>ADD NEW COLLECTION</h2>
                    <p>// SUBMIT NEW DOSSIER ENTRY TO CENTRAL ARCHIVE</p>
                </div>
            </div>

            <form className="collection-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">NAME</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="e.g. M1 Garand, Thompson SMG"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="origin">ORIGIN</label>
                        <input
                            id="origin"
                            name="origin"
                            type="text"
                            placeholder="e.g. United States, Germany"
                            value={formData.origin}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">CATEGORY</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Rifle">Rifle</option>
                            <option value="Handgun">Handgun</option>
                            <option value="Shotgun">Shotgun</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="image">IMAGE FILE</label>

                    <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                            const file = event.target.files[0]

                            if (!file) return

                            setImageFile(file)

                            const previewUrl = URL.createObjectURL(file)
                            setImagePreview(previewUrl)
                        }}
                    />

                    {imagePreview && (
                        <div className="image-preview">
                            <p>IMAGE PREVIEW</p>
                            <img src={imagePreview} alt="Collection preview" />
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="description">
                        HISTORICAL BRIEFING / DESCRIPTION
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Enter historical background and description..."
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="button button-secondary"
                        onClick={handleCancel}
                    >
                        CANCEL
                    </button>

                    <button type="submit" className="button button-primary">
                        + ADD COLLECTION
                    </button>
                </div>
            </form>
        </section>
    )
}

export default AddCollection
