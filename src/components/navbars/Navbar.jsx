import logo from '../../asstes/menu-logo.png'
import {Menubar} from 'primereact/menubar';
import {Menu} from 'primereact/menu';
import {useRef} from "react";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../../store/slices/userSlice.js";

export default function Navbar(props) {
    // eslint-disable-next-line react/prop-types
    const {user} = props;
    const navigate = useNavigate();
    const menuRight = useRef(null);
    const dispatch = useDispatch();

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home'
        },
        {
            label: 'Projects',
            icon: 'pi pi-star',
            command: () => {
                navigate('/projects');
            }
        },
        {
            label: 'Campaigns',
            icon: 'pi pi-book',
            command: () => {
                navigate('/campaigns');
            }
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope',
        }
    ];

    const options = [
        {
            label: 'Options',
            items: [
                {
                    label: 'Users',
                    icon: 'pi pi-users',
                    command: () => {
                        navigate('/users');
                    }
                },
                {
                    label: 'Setting',
                    icon: 'pi pi-cog'
                },
                {
                    label: 'Billing',
                    icon: 'pi pi-cart-minus'
                },
                {
                    label: 'Help',
                    icon: 'pi pi-info-circle'
                },
                {
                    label: 'Log out',
                    icon: 'pi pi-sign-out',
                    command: () => {
                        dispatch(logout());
                    }
                }
            ]
        }
    ];

    const start = <img alt="logo" src={logo} width="130" className="mr-2"></img>;
    const end = (
        <div>
            <Menu model={options} popup ref={menuRight} id="popup_menu_right" popupAlignment="right"/>
            <Button severity="secondary" text
                    onClick={(event) => menuRight.current.toggle(event)}>
                <div className='mx-4 text-left'>
                    <div>
                        <b>
                            {user}
                        </b>
                    </div>
                    <div className='text-base'>
                        Company name
                    </div>
                </div>
            </Button>

        </div>
    );

    return (
        <div className="card">
            <Menubar model={items} start={start} end={end}/>
        </div>
    )
}
        