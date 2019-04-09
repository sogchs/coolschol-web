// import React, { Component } from 'react';
// import { Link, Redirect, withRouter } from 'react-router-dom'
// import authService from '../../services/auth-service';
// import { withAuthConsumer } from '../../contexts/AuthStore';

// import { FloatingMenu, MainButton,ChildButton } from 'react-floating-button-menu';


// class FooterNav extends Component {

//   state={
//     isOpenSet: false,
//     isOpenApps: false,
//     redirect: null
//   }

//   handleLogout = () => {
//     authService.logout()
//       .then( () => {
//         this.props.onUserChanged({})
//         this.props.history.push('/login')
//       })
//   }
  

//   handleClickClassroom = () => {this.setState({ redirect: "/classroom" }).then(this.setState({redirect:null}))}
//   // handleClickTimer = () => {this.setState({ redirect: "/timer" })}
//   // handleClickGroups = () => {this.setState({ redirect: "/groups" })}
//   // handleClickChat = () => {this.setState({ redirect: "/chat" })}
//   // handleClickBoard = () => {this.setState({ redirect: "/board" })}
//   // handleClickCalendar = () => {this.setState({ redirect: "/calendar" })}
//   // handleClickStudent = () => {this.setState({ redirect: "/student" })}
//   // handleClickProfile = () => {this.setState({ redirect: "/classroom" })}
//   // handleClickClassroomEdit = () => {this.setState({ redirect: "/classroom-edit" })}
  
  

//   render() {
  
//     if (this.state.redirect) {
//       return <Redirect to={this.state.redirect} />
//     }

    
//     return(
//       <div className="container-footerNav">
//       {/* <Link to="/home">Home</Link>
//       <Link to="/calendar">Calendar</Link>
//       <Link to="/groups">Groups</Link> */}
//       {this.props.app !== false &&
//       <>

//         <MainButton
//             className="btns-footerNav"
//             iconResting={<span className="icon-home-chip"></span>}
//             iconActive={<span className="icon-home-chip"></span>}
//             iconColor="white"
//             backgroundColor="black"
//             size={56}
//             onClick={(redirect) => redirect}
//           />
//         <FloatingMenu
//           slideSpeed={500}
//           direction="up"
//           isOpen={this.state.isOpenApps}
//         >
//           <MainButton
//             className="btns-footerNav"
//             iconResting={<span className="icon-apps"></span>}
//             iconActive={<span className="icon-apps"></span>}
//             iconColor="white"
//             backgroundColor="black"
//             size={56}
//             onClick={() => this.setState({ isOpenApps: !this.state.isOpenApps })}
//           />
          
//           <ChildButton
//             className="btns-set"
//             icon={<span className="icon-temporizador"></span>}
//             href="./timer"
//             size={56}
//             onClick={this.handleClickTimer}
//             />
//           <ChildButton
//             className="btns-set"
//             icon={<span className="icon-grupos"></span>}
//             href="" 
//             size={56}
//             onClick={this.handleClickGroups}
//             />
      
//           <ChildButton
//             className="btns-set"
//             icon={<span className="icon-conversation"></span>}
//             size={56}
//             />
//           <ChildButton
//             className="btns-set"
//             icon={<span className="icon-tablon"></span>}
//             href="" 
//             size={56}
//             />
//           <ChildButton
//             className="btns-set"
//             icon={<span className="icon-calendario"></span>}
//             href="" 
//             size={56}
//             />
//         </FloatingMenu>

//         <FloatingMenu
//         slideSpeed={500}
//         direction="up"
//         isOpen={this.state.isOpenSet}
//       >
//         <MainButton
//           className="btns-footerNav"
//           iconResting={<span className="icon-ajustes"></span>}
//           iconActive={<span className="icon-ajustes"></span>}
//           iconColor="white"
//           backgroundColor="black"
//           size={56}
//           onClick={() => this.setState({ isOpenSet: !this.state.isOpenSet })}
//         />
//         <ChildButton
//           className="btns-set"
//           icon={<span className="icon-log-out"></span>}
//           href="" 
//           size={56}
//           />
//         <ChildButton
//           className="btns-set"
//           icon={<span className="icon-set-profile"></span>}
//           href="" 
//           size={56}
//           />
//         <ChildButton
//           className="btns-set"
//           icon={<span className="icon-set-classroom"></span>}
//           href="" 
//           size={56}
//           />
        
//       </FloatingMenu>
//       </>
//       }
//       {this.props.app === false &&
//       <MainButton
//             className="btns-footerNav"
//             iconResting={<span className="icon-log-out"></span>}
//             iconActive={<span className="icon-log-out"></span>}
//             iconColor="white"
//             backgroundColor="black"
//             size={56}
//             onClick={() => this.handleLogout()}
//           />}
//     </div>

//     )
//   }
// }

// export default withAuthConsumer(withRouter(FooterNav)) ;
