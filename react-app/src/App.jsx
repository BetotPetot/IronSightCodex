
import { useCallback, useEffect, useState } from 'react'
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
} from 'react-router-dom'

import Header from './components/Header'
import CollectionStats from './components/CollectionStats'
import CollectionDetail from './pages/CollectionDetail'
import Footer from './components/Footer'
import Toast from './components/Toast'

import Home from './pages/Home'
import Archive from './pages/Archive'
import AddCollectionPage from './pages/AddCollectionPage'

import './App.css'



function CollectionDetailRoute({
  collections,
  onUpdateCollection,
  onDeleteCollection,
}) {
  const { id } = useParams()

  const collection = collections.find(
    (item) => item.id === Number(id)
  )

  return (
    <CollectionDetail
      collection={collection}
      onUpdateCollection={onUpdateCollection}
      onDeleteCollection={onDeleteCollection}
    />
  )
}


function App() {
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    async function fetchCollections() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(
          'http://localhost:3000/collections'
        )

        if (!response.ok) {
          throw new Error('Failed to fetch collections.')
        }

        const data = await response.json()
        setCollections(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCollections()
  }, [])

  const navigate = useNavigate()

  const [toastVisible, setToastVisible] = useState(false)
  const [toastTitle, setToastTitle] = useState('')
  const [toastMessage, setToastMessage] = useState('')

  const closeToast = useCallback(() => {
    setToastVisible(false)
  }, [])

  async function handleAddCollection(newCollection) {
    try {
      const response = await fetch(
        'http://localhost:3000/collections',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...newCollection,
            image: newCollection.image || '',
            isFeatured: false,
          }),
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          Array.isArray(errorData.message)
            ? errorData.message.join(', ')
            : errorData.message || 'Failed to add collection.'
        )
      }

      const createdCollection = await response.json()

      setCollections((previousCollections) => [
        ...previousCollections,
        createdCollection,
      ])

      setToastTitle('COLLECTION ADDED SUCCESSFULLY')
      setToastMessage('New collection has been saved to the archive.')
      setToastVisible(true)

      navigate('/archive')

      return true
    } catch (error) {
      console.error('Error adding collection:', error)
      alert(error.message)

      return false
    }
  }


  async function handleUpdateCollection(id, updatedCollection) {
    try {
      const response = await fetch(
        `http://localhost:3000/collections/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...updatedCollection,
            image: updatedCollection.image || '',
            isFeatured: updatedCollection.isFeatured ?? false,
          }),
        }
      )

      if (!response.ok) {
        const errorData = await response.json()

        throw new Error(
          Array.isArray(errorData.message)
            ? errorData.message.join(', ')
            : errorData.message || 'Failed to update collection.'
        )
      }

      const updatedData = await response.json()

      setCollections((previousCollections) =>
        previousCollections.map((collection) =>
          collection.id === id ? updatedData : collection
        )
      )

      setToastTitle('COLLECTION UPDATED SUCCESSFULLY')
      setToastMessage('Collection changes have been saved.')
      setToastVisible(true)

      return true
    } catch (error) {
      console.error('Error updating collection:', error)
      alert(error.message)

      return false
    }
  }

  async function handleDeleteCollection(id) {
    try {
      const response = await fetch(`http://localhost:3000/collections/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          errorData.message || 'Failed to delete collection.'
        )
      }

      setCollections(prev =>
        prev.filter(collection => collection.id !== id)
      )

      setToastTitle('COLLECTION DELETED SUCCESSFULLY')
      setToastMessage('Collection has been removed from the archive.')
      setToastVisible(true)

      navigate('/archive')
      return true
    } catch (error) {
      console.error('Error deleting collection:', error)
      alert(error.message)
      return false
    }
  }

  return (
    <>
      <Header />

      <Toast
        visible={toastVisible}
        onClose={closeToast}
        title={toastTitle}
        message={toastMessage}
      />

      <main id="home">
        {loading && <p>Loading collections...</p>}

        {error && <p role="alert">{error}</p>}

        {!loading && !error && (
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <CollectionStats
                    collections={collections}
                  />
                </>
              }
            />

            <Route
              path="/archive"
              element={
                <>
                  <Home />

                  <CollectionStats
                    collections={collections}
                  />

                  <Archive
                    collections={collections}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />
                </>
              }
            />

            <Route
              path="/add-collection"
              element={
                <AddCollectionPage
                  onAddCollection={handleAddCollection}
                />
              }
            />

            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />

            <Route
              path="/archive/:id"
              element={
                <CollectionDetailRoute
                  collections={collections}
                  onUpdateCollection={handleUpdateCollection}
                  onDeleteCollection={handleDeleteCollection}
                />
              }
            />
          </Routes>
        )}
      </main>

      <Footer />
    </>
  )
}

export default App
