import heart from '../assets/heart.png'
export default function FooterCard() {
  return (
    <footer className="mt-9 px-4 flex flex-col justify-center items-center font-ps border-t border-zinc-400 pt-6">
      <div className="flex items-center gap-1">
        <h4 className="text-zinc-500">Made with</h4>
        <img src={heart} className="w-6 h-6" />
      </div>
      <h4 className="text-zinc-500">
        by{' '}
        <a
          href="https://github.com/deepsoumya617"
          target="_blank"
          className="text-zinc-700 hover:text-purple-500"
        >
          deepsoumya!
        </a>
      </h4>
    </footer>
  )
}
