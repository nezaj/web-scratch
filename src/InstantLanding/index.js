function Header() {
  return (
    <div className="flex space-x-4 bg-slate-200 p-4 justify-between">
      <div>Logo</div>
      <div className="flex space-x-4">
        <div>Essays</div>
        <div>Docs</div>
        <div>Login</div>
        <div>Signup</div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <div>
      <div className="space-y-8 lg:flex lg:flex-col lg:items-center">
        <div className="text-4xl">Build applications <span className="text-orange-600 font-bold">from the future.</span></div>
        <p className="w-2/3 lg:text-xl">Instant is for building low-latency and offline-enabled applications. Build your startup with infrastucture inspired from forward-thinking companies like Notion and Figma.</p>
        <div className="flex space-x-4">
          <div className="bg-slate-200 p-4 border">Get Started</div>
          <div className="p-4 border">Explore Docs</div>
        </div>
      </div>
    </div>
  )
}

function Optimistic() {
  return (
    <div className="space-y-4 lg:flex lg:space-x-16">
      <div className="space-y-4 lg:w-1/3">
        <div className="text-2xl">
          Instant Updates
        </div>
        <p>
          Every change a user makes should be reflected instantly. There should be no spinners, loading states, or refresh buttons. Instant automatically applies changes to the UI
          and handles rollbacks if the server rejects the change.
        </p>
      </div>
      <div className="border-2 border-gray-200 p-4 h-96 space-y-4 lg:w-2/3">
        <p>Optimistic Example</p>
        <p>Perhaps we can show a code block comparing a traditional way of doing it vs. Instant way of doing it.</p>
      </div>
    </div>
  )
}

function Multiplayer() {
  return (
    <div className="space-y-4 lg:flex lg:space-x-16">
      <div className="space-y-4 lg:w-1/3">
        <div className="text-2xl">
          Multiplayer by Default
        </div>
        <p>
          Users these days seek collaborative experiences and sync across devices. If you've ever built a multiplayer game or a collaborative document editor, you know how hard it is to get right. Instant handles the complexity and lets you focus on building your product.
        </p>
      </div>
      <div className="border-2 border-gray-200 p-4 h-96 space-y-4 lg:w-2/3">
        <p>Mulitplayer Example</p>
        <p>Maybe a little emoji picker demo similar to https://x.com/stopachka/status/1753511600215195747?s=20</p>
      </div>
    </div>
  )
}

function Offline() {
  return (
    <div className="space-y-4 lg:flex lg:space-x-16">
      <div className="space-y-4 lg:w-1/3">
        <div className="text-2xl">
          Offline Enabled
        </div>
        <p>
          Users want your app to work even when they're offline. Instant automatically caches data locally and syncs it when the user comes back online. You can build your app as if the user is always online and let Instant handle the rest.
        </p>
      </div>
      <div className="border-2 border-gray-200 p-4 h-96 space-y-4 lg:w-2/3">
        <p>Offline Example</p>
        <p>Maybe here we do a video animation with a simple text editor mimicing dropbox paper. We show in the video our implementation, vs dropbox paper (which shows a pop-up saying you're offline)</p>
      </div>
    </div>
  )
}

function Features() {
  return (
    <div className="space-y-8">
      <div className="text-4xl">
        The Next Web
      </div>
      <div className="lg:w-2/3 space-y-4">
        <p>
          The best applications today have a common feature set. Every interaction happens instantly, you rarely see a loading screen, collaboration is easy and delightful, and the app still works when offline.
        </p>
        <p>These features is what makes applications like Figma, Notion, and Linear stand out today. In the future, these features will be table stakes for any application.</p>
        <p>If you want to compete with the best, you need an infrastructure that solves three problems.</p>
      </div>
      <div className="space-y-8">
        <Optimistic />
        <Multiplayer />
        <Offline />
      </div>
    </div>
  )
}

function Examples() {
  return (
    <div className="space-y-4">
      <div className="text-4xl">
        Instant in Action
      </div>
      <p>
        With Instant you can build
      </p>
    </div>
  )
}

function Endorsements() {
  return (
    <div className="space-y-4">
      <div className="border-2 border-gray-200 flex flex-col space-y-4 p-4 lg:p-16 items-center lg:text-4xl">
        <div className>
          I wanted to build relational capabilities into Firebase (but it would have required us to build another database and we never got around to it). I'm glad to see Instant is doing it.
        </div>
        <div>- James Tamplin, CEO of Firebase</div>
      </div>
      <div className="border-2 border-gray-200 flex flex-col space-y-4 p-4 lg:p-16 items-center lg:text-4xl">
        <div>
          I built a tiny “email inbox” simulation with user auth/login, permissions, multiple folders (inbox /_ sent), and live updates (including sending across user accounts) in ~50 minutes or so. Very impressive stuff, and a lot of fun!
        </div>
        <div>- Sean Grove, CEO of OneGraph</div>
      </div>
    </div>
  )
}

function Essay() {
  return (
    <div className="space-y-4 lg:flex lg:flex-col">
      <div className="text-4xl">From the team</div>
      <div className="lg:w-2/3 space-y-4">
        <p>
          Instant is built by senior and staff engineers from Facebook and Airbnb. We're backed by YCombinator, SV Angel, James Tamplin (CEO of Firebase), and Paul Graham.
        </p>
        <p>We spent multiple years thinking deeply about this problem and have built a product that we believe is the future of application development.</p>
        <p>Check out our essay below to learn more why we think Instant is solving one of the largest problems in frontend development today.</p>
      </div>
      <div className="border-2 border-gray-200 w-36 p-2 text-center">Read the Essay</div>
    </div>
  )
}

function Footer() {
  return (
    <div className="flex space-x-4 justify-end border-t p-4 bg-slate-200">
      <div>Login</div>
      <div>Sign Up</div>
      <div>Discord</div>
      <div>Essays</div>
      <div>Docs</div>
    </div>
  )
}

export default function App() {
  return (
    <div className="space-y-8">
      <Header />
      <div className="p-4 space-y-8 lg:w-4/5 lg:mx-auto">
        <Hero />
        <Features />
        <Examples />
        <Endorsements />
        <Essay />
      </div>
      <Footer />
    </div>);
}
