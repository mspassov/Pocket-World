import axios from "axios";

const URL = "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";

const options = {
  params: {
    bl_latitude: "11.847676",
    tr_latitude: "12.838442",
    bl_longitude: "109.095887",
    tr_longitude: "109.149359"
  },
  headers: {
    "x-rapidapi-key": "455b4803d5mshc8e61d355fc4c71p1640f3jsnea6aa23fd659",
    "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
  },
};

export const getPlacesData = async () => {
  try {
    const {data: {data} } = await axios.get(URL, options);
		return data;

  } catch (error) {
		console.log(error);
	}
};
