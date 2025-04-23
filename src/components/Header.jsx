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
      <ChangeTheme />
    </header>
  )
}