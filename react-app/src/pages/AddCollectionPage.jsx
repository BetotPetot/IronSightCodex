
import AddCollection from '../components/AddCollection'

function AddCollectionPage({ onAddCollection }) {
    return (
        <section id="add-collection">
            <AddCollection
                onAddCollection={onAddCollection}
            />
        </section>
    )
}

export default AddCollectionPage
