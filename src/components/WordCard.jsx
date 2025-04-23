import { useEffect, useState, useRef } from 'react'

export default function WordCard(props) {
  const audioRef = useRef(null)
  const { word } = props
  //   word data
  const [data, setData] = useState(null)
  //   loading state
  const [isLoading, setIsLoading] = useState(false)

  // destructure data
  const phonetics = data?.[0]?.phonetics ?? []
  const meanings = data?.[0]?.meanings ?? []
  const sourceUrls = data?.[0]?.sourceUrls ?? []
  const synonymsData = {}
  meanings.forEach((m) => {
    synonymsData[m.partOfSpeech] = m.synonyms || []
  })

  // console.log(synonymsData)

  //   phonetics
  const phoneticsData = {
    text: '',
    audio: '',
  }
  phonetics.forEach((p) => {
    if (!phoneticsData.text && p.text?.trim()) phoneticsData.text = p.text
    if (!phoneticsData.audio && p.audio?.trim()) phoneticsData.audio = p.audio
  })

  // console.log(phoneticsData)
  // meanings
  const filteredMeanings = {}

  meanings.forEach((m) => {
    filteredMeanings[m.partOfSpeech] = m.definitions.map((def) => {
      return {
        definition: def.definition,
        example: def.example || '',
      }
    })
  })

  useEffect(() => {
    // edge case
    if (isLoading || !localStorage || !word || word.trim() === '') return

    // check localstorage
    let cache = {}
    if (localStorage.getItem('lexo'))
      cache = JSON.parse(localStorage.getItem('lexo'))

    // find in cache
    if (word in cache) {
      setData(cache[word])
      return
    }

    // Fetch data
    async function fetchWordData() {
      setIsLoading(true)
      try {
        const res = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`
        )
        const wordData = await res.json()
        setData(wordData)
        // console.log(wordData)

        // store in cache
        cache[word] = wordData
        localStorage.setItem('lexo', JSON.stringify(cache))
      } catch (err) {
        console.log(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchWordData()
  }, [word])

  // word not found
  if (data?.title == 'No Definitions Found') {
    return (
      <div className="mt-40 text-center">
        <h3 className="font-medium text-3xl md:text-5xl tracking-wider text-zinc-400 dark:text-zinc-600 font-ps px-3">
          No <br />
          Definitions Found!
        </h3>
      </div>
    )
  }

  //   Loading state
  if (!word) {
    return (
      <div className="mt-40 text-center">
        <h3 className="font-medium text-3xl md:text-5xl tracking-wider text-zinc-400 dark:text-zinc-600 font-ps px-3">
          Search <br />
          something!
        </h3>
      </div>
    )
  }
  if (isLoading) {
    return (
      <div className="mt-40 text-center">
        <h3 className="font-medium text-[18px] tracking-wider text-zinc-400 dark:text-zinc-600">
          Fetching <br />
          Word Data...
        </h3>
      </div>
    )
  }
  return (
    <div className="px-4">
      {/* word + phonetic + audio */}
      <div className="mt-10 flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="font-bold text-3xl md:text-4xl tracking-tight font-ps">
            {word.toLowerCase()}
          </h1>
          <p className="text-xl tracking-wide text-purple-600 dark:text-purple-500">
            {phoneticsData.text}
          </p>
        </div>
        {phoneticsData.audio && (
          <>
            <audio ref={audioRef} src={phoneticsData.audio} />
            <button
              onClick={() => audioRef.current && audioRef.current.play()}
              className="text-xl md:text-2xl bg-purple-300 dark:bg-purple-400 w-13 h-13  md:w-17 md:h-17 rounded-full cursor-pointer"
            >
              <i className="ri-play-large-fill text-purple-600 dark:text-purple-700"></i>
            </button>
          </>
        )}
      </div>
      {/* Meanings */}
      <div className="mt-12">
        {Object.entries(filteredMeanings).map(([partOfSpeech, definitions]) => {
          const synonyms = synonymsData[partOfSpeech] || []
          return (
            <div key={partOfSpeech}>
              <div className="flex items-center gap-3">
                <h3 className="text-[17px] font-bold font-ps tracking-wider">
                  {partOfSpeech}
                </h3>
                <div className="w-full border-b border-zinc-400 dark:border-zinc-500"></div>
              </div>
              <div className="mt-3">
                <h3 className="font-bold text-[16px] tracking-wider text-zinc-400 mb-2 dark:text-zinc-300">
                  Meaning
                </h3>
                <ul className="mb-6 px-6">
                  {definitions.map((def, idx) => {
                    return (
                      <li
                        key={idx}
                        className="text-[17px] font-medium tracking-wider mt-2"
                      >
                        <span className="text-purple-500">•</span>{' '}
                        {def.definition}
                        {def.example && (
                          <p className="mt-1 text-[16px] text-zinc-500 dark:text-zinc-400 tracking-wider px-4">
                            {`"${def.example}"`}
                          </p>
                        )}
                      </li>
                    )
                  })}
                </ul>
                {synonyms.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-[16px] font-bold text-zinc-400 tracking-wide mb-3 dark:text-zinc-300">
                      Synonyms
                    </h4>
                    <ul className="flex flex-wrap gap-2">
                      {synonyms.map((syn, idx) => (
                        <li
                          key={idx}
                          className="text-[18px] font-medium tracking-wide text-purple-600 bg-purple-100 px-6 py-3 rounded-full dark:bg-purple-300 dark:text-purple-700"
                        >
                          {syn}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
      {/* sourceurl */}
      <div>
        <div className="flex items-center gap-3">
          <h3 className="text-[16px] font-ps font-bold">Source</h3>
          <div className="w-full border-b border-zinc-400 dark:border-zinc-500"></div>
        </div>
        <h4 className="mt-3 px-6 text-zinc-600 dark:text-zinc-400 font-medium tracking-wider underline underline-offset-[7px] decoration-purple-500 hover:text-purple-500 text-sm md:text-lg">
          <a href={sourceUrls[0]} target="_blank">
            {sourceUrls[0]}
          </a>
        </h4>
      </div>
    </div>
  )
}
