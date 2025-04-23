import { useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import WordCard from './components/WordCard'
import FooterCard from './components/FooterCard'

export default function App() {
  const [inputWord, setInputWord] = useState('')
  const [searchWord, setSearchWord] = useState('')

  function updateSearchWord() {
    if (inputWord.trim()) {
      setSearchWord(inputWord)
    }
  }

  return (
    <div className="min-h-screen max-w-3xl mx-auto font-sans text-zinc-900 dark:text-zinc-100 px-4 py-6 flex flex-col">
      <Header />
      <main className="flex-grow">
        <SearchBar
          inputWord={inputWord}
          setInputWord={setInputWord}
          updateSearchWord={updateSearchWord}
        />
        <WordCard word={searchWord} />
      </main>
      <footer>
        <FooterCard />
      </footer>
    </div>
  )
}
