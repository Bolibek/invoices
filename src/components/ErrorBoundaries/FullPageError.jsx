export default function FullPageError({error, classNames}) {
  return (
    <div role="alert">
      <h1 className="text-[6rem] text-center">Ooooops... 404 Error</h1>
      <p className="text-[3rem] text-center mt-10">{error.text}</p>
    </div>
  )
}
