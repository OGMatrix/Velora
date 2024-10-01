import axios from "axios"
import { ApiError, checkTokenFromApi, handleApiErrors } from "../api";

async function getProfile() {
    try {
        const token = localStorage.getItem('token');
        if (!token) return Promise.resolve(null);
        const options = {
            headers: { 'Origin': 'https://velora.ogmatrix.net', 'Authorization': `Bearer ${token}` }
        };

        const response = await axios.get(`${import.meta.env.VITE_AUTH_API_HOST}/user/user-profile`, options);
        if (response && response.data.success) {
            response.data.user.icon = "https://cdn.discordapp.com/attachments/1132692312896577567/1132692389685891112/my-hero-academia-discord.jpg?ex=65edce7e&is=65db597e&hm=3f44ac4784ff00432e59781b6d1a7f361e1c48e557b002b4ae72b5a6c33c68ce&";
            await checkTokenFromApi(response)
            return Promise.resolve(response.data.user)
        } else {
            return Promise.resolve(null)
        }
    } catch (err) {
        const apiError: ApiError = handleApiErrors(err)
        console.log(err)
        return Promise.reject(apiError)
    }
}

export {getProfile}