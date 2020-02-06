import React, { Component } from 'react';
import { userService } from './user.service';
import { authenticationService } from './authentication.service';

export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props);
        document.body.style.backgroundColor = '#FFFFFF';
        document.body.style.marginTop = '53px';
        this.state = {
            currentUser: authenticationService.currentUserValue,
            users: null
        };
    }

    componentDidMount() {
        const { currentUser } = this.state;
        if (currentUser.rol === "Admin" || currentUser.rol === "PM") {
            userService.getAll().then(users => this.setState({ users }));
        }
    }

    render() {
        const { currentUser, users } = this.state;
        return (
            <div>
                <h1> {currentUser.rol === "Admin" && 
                    <p>Hola Mundo!</p>}</h1>
                <h1> {currentUser.rol !== "Admin" &&
                    <p>Hola Mundo 2!</p>}</h1>
                <h1>Hi {currentUser.username}!</h1>
                <h2> {currentUser.rol} </h2>
                <p>You're logged in with React & JWT!!</p>
                <h3>Users from secure api end point:</h3>
                {users &&
                    <ul>
                    {users.map(user =>
                        <li key={user.id}>{user.username} </li>
                        )}
                    </ul>
                }

                <h1> Texto para probar el Scroll To Top </h1>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vulputate efficitur nisl. Maecenas ut rutrum arcu. Suspendisse molestie auctor risus, a congue tellus dapibus quis. Nullam vel pharetra est, sit amet aliquet orci. Vestibulum ultricies elit et ante venenatis, sit amet pharetra nulla finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin tincidunt volutpat ligula eget maximus. Cras in sem consequat, viverra mi dignissim, gravida tellus. Etiam viverra velit nec augue cursus, non tempus lectus dapibus. Praesent elit dolor, ullamcorper id risus eu, tincidunt lobortis erat. Aenean sed ligula non felis pretium finibus ac ut velit. Proin at nulla et augue euismod dictum interdum id eros. Sed a felis malesuada urna pellentesque congue nec sit amet dui. Duis fringilla nec tortor quis pharetra. Vivamus nec efficitur sem.</p>

                <p>Fusce ac rutrum enim, sed faucibus arcu. Nunc quis pellentesque neque, id congue erat. Nam pretium diam vel nunc rhoncus lacinia. Sed a tortor ligula. Donec in risus purus. Integer lobortis porta justo, at vehicula dolor euismod sit amet. Proin lorem purus, finibus ut risus ut, euismod egestas risus. In hac habitasse platea dictumst. Nullam ut cursus velit. Pellentesque non dictum justo. Donec dapibus dignissim quam eget elementum. Nunc sollicitudin fringilla aliquam. Maecenas non maximus erat.</p>

                <p>Donec varius blandit hendrerit. Vivamus finibus, tortor vel venenatis interdum, leo sapien sodales nunc, ac malesuada ex massa laoreet eros. Duis et volutpat sem. In eros enim, mollis quis sem eu, vulputate mollis libero. Sed sit amet sapien aliquet, dictum magna eu, mollis mi. Proin sodales, lectus vitae posuere pharetra, lectus risus euismod mauris, vitae egestas dui sem sed turpis. Donec vestibulum arcu at tristique pretium. Aliquam egestas, arcu et dapibus porttitor, sem metus fringilla felis, id suscipit elit turpis non leo. Nulla sit amet magna ut ante placerat aliquam id quis arcu. Maecenas quis mi a dui molestie mattis id varius metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dignissim maximus quam. In vitae semper risus. Vivamus egestas tellus tellus, ut porttitor nunc porta et.</p>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vulputate efficitur nisl. Maecenas ut rutrum arcu. Suspendisse molestie auctor risus, a congue tellus dapibus quis. Nullam vel pharetra est, sit amet aliquet orci. Vestibulum ultricies elit et ante venenatis, sit amet pharetra nulla finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin tincidunt volutpat ligula eget maximus. Cras in sem consequat, viverra mi dignissim, gravida tellus. Etiam viverra velit nec augue cursus, non tempus lectus dapibus. Praesent elit dolor, ullamcorper id risus eu, tincidunt lobortis erat. Aenean sed ligula non felis pretium finibus ac ut velit. Proin at nulla et augue euismod dictum interdum id eros. Sed a felis malesuada urna pellentesque congue nec sit amet dui. Duis fringilla nec tortor quis pharetra. Vivamus nec efficitur sem.</p>

                <p>Fusce ac rutrum enim, sed faucibus arcu. Nunc quis pellentesque neque, id congue erat. Nam pretium diam vel nunc rhoncus lacinia. Sed a tortor ligula. Donec in risus purus. Integer lobortis porta justo, at vehicula dolor euismod sit amet. Proin lorem purus, finibus ut risus ut, euismod egestas risus. In hac habitasse platea dictumst. Nullam ut cursus velit. Pellentesque non dictum justo. Donec dapibus dignissim quam eget elementum. Nunc sollicitudin fringilla aliquam. Maecenas non maximus erat.</p>

            </div>
        );
    }
}