import Navigation from "./Components/Navigation/Navigation"
import MovingBG from "./Components/Particles/Particles"
import { Component } from "react"
import SignIn from "./Components/SignIn/SignIn"
import Register from "./Components/Register/Register"
import Landing from "./Components/Landing/Landing"


const initialState = {
  route: "signin",
  isSignedIn: false,
  //JWT is better
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  }
}
class Home extends Component {
  constructor() {
    super();
    this.state = 
      initialState
    
  }
  
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      }
    })
  }
  emptyUser = () => {
    this.setState(initialState)
  }

  
  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState({ isSignedIn: true })
    } else if (route === 'signin') {
      this.setState({ isSignedIn: false })
    }
    this.setState({ route: route });
  }
  
  updateEntries = (entry) => {
    this.setState(
      Object.assign(this.state.user,{entries:entry})
    )
  }

  render() {
    return (
      <div className="font-mono relative h-screen w-full">
        <MovingBG />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} emptyUser={this.emptyUser} route={this.state.route} />
        {this.state.route === "signin" ?
          <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          :
          (this.state.route === 'register' ?
            <Register onRouteChange={this.onRouteChange} />
            :

            <Landing
              user={this.state.user}
              updateEntries={this.updateEntries}
            />
          )
        }
        <div className="absolute bottom-0 w-full flex justify-around">
          <p>
            Ⓒ Theo Millard 2023
          </p>
          <a href="mailto:dev.theomt@gmail.com">
            <p>dev.theomt@gmail.com</p>
          </a>
        </div>
      </div>
    )
  }
}

export default Home