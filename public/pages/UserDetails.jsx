import { userFrontService } from "../services/user.front.service.js"
import { updateUser } from "../store/user.actions.js"

const { useSelector } = ReactRedux
const { useParams, useNavigate } = ReactRouterDOM
const { useEffect, useState } = React

export function UserDetails() {
    const [user, setUser] = useState(userFrontService.getEmptyUser())
    const [fullname, setFullname] = useState('')
    const [prefs, setPrefs] = useState({ color: '#ffffff', bgColor: '#000000' })
    const [isUserLogged, setIsUserLogged] = useState(false)

    const currUser = useSelector(state => state.user)

    const params = useParams()

    useEffect(() => {
        userFrontService.getById(params.userId)
            .then(foundUser => {
                if (foundUser._id === currUser._id) setIsUserLogged(true)
                else setIsUserLogged(false)
                setUser(foundUser)
                setFullname(foundUser.fullname)
                setPrefs(foundUser.prefs || { color: '#ffffff', bgColor: '#000000' })

            })
    }, [params.userId, currUser])

    function handleChange({ target }) {
        const { value, name } = target
        switch (name) {
            case 'fullname':
                setFullname(value)
                break
            case 'txtColor':
                setPrefs({ ...prefs, color: value })
                break
            case 'bgColor':
                setPrefs({ ...prefs, bgColor: value })
                break

        }
    }

    function onSubmit() {
        const updatedUser = { ...user, fullname, prefs }
        updateUser(updatedUser)
            .then(() => setUser(updatedUser))


    }

    if (!user || Object.keys(user).length === 0) {
        return <div className="no-user-details">Please log in for showing user details</div>
    }
    return <section className="user-details" style={{ color: user.prefs.color, backgroundColor: user.prefs.bgColor }}>
        <h2>Hello {user.fullname}</h2>
        {isUserLogged && <section>
            <div>
                <label htmlFor="fullname"></label>
                <input type="text" id="fullname" name="fullname"
                    value={fullname} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="txtColor"></label>
                <input type="color" id="txtColor" name="txtColor"
                    value={prefs.color} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="bgColor"></label>
                <input type="color" id="bgColor" name="bgColor"
                    value={prefs.bgColor} onChange={handleChange} />
            </div>
            <button onClick={onSubmit} >Submit</button>
        </section>}

        <table border="1" className="activities">
            <thead>
                <tr>
                    <th>Todo</th>
                    <th>Action</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {user.activities.map(activity => {
                    return <tr key={activity.txt}>
                        <td>{activity.txt}</td>
                        <td></td>
                        <td></td>
                    </tr>
                })}
            </tbody>
        </table>
    </section>
}