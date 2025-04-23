export default function SearchBar(props) {
  const { inputWord, setInputWord, updateSearchWord } = props
  return (
    <div className="mt-10 flex items-center">
      <input
        type="text"
        value={inputWord}
        className="w-full px-5 py-5 bg-gray-100 rounded-l-xl border-none focus:outline-none font-bold tracking-wider text-xl dark:bg-zinc-900"
        onChange={(e) => setInputWord(e.target.value)}
      />
      <button
        className="text-purple-400 text-xl bg-gray-100 dark:bg-zinc-900 px-7 py-5 rounded-r-xl cursor-pointer hover:text-purple-600"
        onClick={updateSearchWord}
      >
        <i className="ri-search-line"></i>
      </button>
    </div>
  )
}
