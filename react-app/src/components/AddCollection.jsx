
import { useState } from 'react'

function AddCollection({ onAddCollection }) {
    const initialFormData = {
        name: '',
        origin: '',
        category: '',
        description: '',
    }

    const [formData, setFormData] = useState(initialFormData)
    const [imageFile, setImageFile] = useState(null)
    const [imagePreview, setImagePreview] = useState('')
    const [errors, setErrors] = useState({})

    function validateField(name, value) {
        if (typeof value === 'string' && !value.trim()) {
            const messages = {
                name: 'Name is required.',
                origin: 'Origin is required.',
                category: 'Please select a category.',
                description: 'Description is required.',
            }

            return messages[name]
        }

        return ''
    }

    function handleChange(event) {
        const { name, value } = event.target

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }))

        setErrors((previousErrors) => ({
            ...previousErrors,
            [name]: validateField(name, value),
        }))
    }

    function handleCancel() {
        setFormData(initialFormData)
        setImageFile(null)
        setImagePreview('')
        setErrors({})

        const imageInput = document.getElementById('image')
        if (imageInput) imageInput.value = ''
    }

    function handleSubmit(event) {
        event.preventDefault()

        const newErrors = {}

        Object.entries(formData).forEach(([name, value]) => {
            const error = validateField(name, value)

            if (error) {
                newErrors[name] = error
            }
        })

        setErrors(newErrors)

        if (Object.keys(newErrors).length > 0) {
            return
        }

        const imageUrl = imageFile
            ? URL.createObjectURL(imageFile)
            : ''

        onAddCollection({
            ...formData,
            image: imageUrl,
        })

        setFormData(initialFormData)
        setImageFile(null)
        setImagePreview('')
        setErrors({})

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

            <form
                className="collection-form"
                onSubmit={handleSubmit}
                noValidate
            >
                <div className="form-group">
                    <label htmlFor="name">NAME</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="e.g. M1 Garand, Thompson SMG"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? 'field-invalid' : ''}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                        <small id="name-error" className="field-error">
                            {errors.name}
                        </small>
                    )}
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
                            className={errors.origin ? 'field-invalid' : ''}
                            aria-invalid={Boolean(errors.origin)}
                            aria-describedby={errors.origin ? 'origin-error' : undefined}
                        />
                        {errors.origin && (
                            <small id="origin-error" className="field-error">
                                {errors.origin}
                            </small>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">CATEGORY</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className={errors.category ? 'field-invalid' : ''}
                            aria-invalid={Boolean(errors.category)}
                            aria-describedby={errors.category ? 'category-error' : undefined}
                        >
                            <option value="">Select Category</option>
                            <option value="Rifle">Rifle</option>
                            <option value="Handgun">Handgun</option>
                            <option value="Shotgun">Shotgun</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.category && (
                            <small id="category-error" className="field-error">
                                {errors.category}
                            </small>
                        )}
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
                            setImagePreview(URL.createObjectURL(file))
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
                        className={errors.description ? 'field-invalid' : ''}
                        aria-invalid={Boolean(errors.description)}
                        aria-describedby={
                            errors.description ? 'description-error' : undefined
                        }
                    />
                    {errors.description && (
                        <small id="description-error" className="field-error">
                            {errors.description}
                        </small>
                    )}
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
