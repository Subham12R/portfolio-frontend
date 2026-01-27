
const Footer = () => {
  return (
    <footer className="w-full flex justify-center items-center  border-zinc-800 bg-black py-4 text-center text-xs text-zinc-400">
        <div className="w-full max-w-4xl border-t border-zinc-800 pt-4  flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-1">
                Designed & coded with <span className="text-pink-500">&#10084;&#65039;</span> by Subham Karmakar.
            </div>
            <div>
                Portfolio &copy; {new Date().getFullYear()} &mdash; <a href="https://github.com/Subham12R" className="underline hover:text-white transition" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>

        </div>

    </footer>
  );
};

export default Footer;
