
import { useCallback, useState } from 'react'
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

const initialCollections = [
  {
    id: 1,
    name: 'M1 Garand',
    origin: 'USA',
    category: 'Rifle',
    image: '/images/m1garand.jpg',
    description:
      'A historical semi-automatic rifle widely used during World War II and the Korean War.',
  },
  {
    id: 2,
    name: 'Kar 98k',
    origin: 'GERMANY',
    category: 'Rifle',
    image: '/images/kar98k.jpg',
    description:
      'A historical bolt-action rifle adopted by the German Wehrmacht in 1935.',
  },
  {
    id: 3,
    name: 'StG 44',
    origin: 'GERMANY',
    category: 'Rifle',
    image: '/images/stg44.jpg',
    description:
      'A historically significant German firearm from the later period of World War II.',
  },
]

function CollectionDetailRoute({ collections }) {
  const { id } = useParams()

  const collection = collections.find(
    (item) => item.id === Number(id)
  )

  return <CollectionDetail collection={collection} />
}

function App() {
  const [collections, setCollections] = useState(initialCollections)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const navigate = useNavigate()

  const [toastVisible, setToastVisible] = useState(false)

  const closeToast = useCallback(() => {
    setToastVisible(false)
  }, [])

  function handleAddCollection(newCollection) {
    const collection = {
      ...newCollection,
      id: Date.now(),
    }

    setCollections((previousCollections) => [
      ...previousCollections,
      collection,
    ])

    setToastVisible(true)
    navigate('/archive')
  }

  return (
    <>
      <Header />

      <Toast
        visible={toastVisible}
        onClose={closeToast}
      />

      <main id="home">
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
              <CollectionDetailRoute collections={collections} />
            }
          />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App
