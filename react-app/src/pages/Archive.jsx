
import CollectionCard from '../components/CollectionCard'
import EmptyState from '../components/EmptyState'

function Archive({
    collections,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
}) {
    const filteredCollections = collections.filter((item) => {
        const searchValue = searchTerm.toLowerCase()

        const matchesSearch =
            item.name.toLowerCase().includes(searchValue) ||
            item.origin.toLowerCase().includes(searchValue)

        const matchesCategory =
            selectedCategory === 'All' ||
            item.category === selectedCategory

        return matchesSearch && matchesCategory
    })

    return (
        <section id="archive" className="collection-section">
            <div className="section-heading">
                <h2>FEATURED COLLECTION</h2>
                <span>// HISTORICAL RIFLES</span>
            </div>

            <div className="collection-controls">
                <input
                    type="text"
                    placeholder="Search by name or origin..."
                    value={searchTerm}
                    onChange={(event) =>
                        setSearchTerm(event.target.value)
                    }
                />

                <select
                    value={selectedCategory}
                    onChange={(event) =>
                        setSelectedCategory(event.target.value)
                    }
                >
                    <option value="All">All Categories</option>
                    <option value="Rifle">Rifle</option>
                    <option value="Handgun">Handgun</option>
                    <option value="Shotgun">Shotgun</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            {filteredCollections.length > 0 ? (
                <div className="collection-grid">
                    {filteredCollections.map((item) => (
                        <CollectionCard
                            key={item.id}
                            collection={item}
                        />
                    ))}
                </div>
            ) : (
                <EmptyState />
            )}
        </section>
    )
}

export default Archive
