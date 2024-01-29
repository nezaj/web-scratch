import { notInterested, data } from "./private"

export default function App() {
  const filteredData = data
    .filter(p => p["Gender"] === "Woman")
    .filter(p => p["Home base city"]?.includes("New York") || p["Home base city"]?.includes("NY"))
    .filter(p => !notInterested.includes(`${p["First name"] || ''} ${p["Last name"] || ''}`.trim()))
  return (
    <div className="p-4">
      {filteredData?.map(person => {
        const bday = person["Birthday"];
        const city = person["Home base city"];
        const email = person["Email"];
        const firstName = person["First name"];
        const lastName = person["Last name"];
        const phone = person["Phone"];
        const socialMedia = person["Social media links"];
        const about = person["Anything else you'd like your potential matches to know?"];
        const extra = person["Anything you'd like the organizers to know?"]
        const pics = person["Pictures"]?.map(pic => pic.url);
        return (
          <div>
            <p>Name: {firstName} {lastName}</p>
            <p>City: {city}</p>
            <p>Bday: {bday}</p>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
            <p>Social Media: {socialMedia}</p>
            <p>About: {about}</p>
            <p>Extra: {extra}</p>
            <div className="flex w-1/3">
              {pics?.map(url => <img src={url} />)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
