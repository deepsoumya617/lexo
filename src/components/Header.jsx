import ChangeTheme from './ChangeTheme'

export default function Header() {
  return (
    <header className="flex justify-between items-center text-3xl">
      <div className="flex items-center gap-1">
        <i className="ri-book-open-line"></i>
        <h1 className="font-bold tracking-tight font-ps underline underline-offset-[5px] decoration-purple-500">
          Lexo
        </h1>
      </div>
      <div className="mr-3">
        <ChangeTheme />
        <button className="cursor-pointer">
          <a href="https://github.com/deepsoumya617/lexo" target="_blank">
            <i className="ri-github-line text-[18px] hover:hover:text-purple-400"></i>
          </a>
        </button>
      </div>
    </header>
  )
}