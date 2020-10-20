const BASEURL = "http://localhost:8000"

/**
 * GET request to fetch Canvas for Lobby based on code
 * 
 * @param {String} code 
 * 
 * @return {Promise}
 */
export const fetchCanvas = code => {
  return fetch(`${BASEURL}/lobbies/${code}/canvas`)
    .then(response=>response.json())
}

/**
 * POST request to send canvas update data and broadcast change to Canvas Channel
 * 
 * @param {Object} updateData object with keys { code, type, drawData }
 */
export const updateCanvas = ({ code, type, drawData }) => {
  let config = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ type, data: drawData })
  }

  fetch(`${BASEURL}/lobbies/${code}/canvas/draw`, config)
}

/**
 * PATCH request to save canvas data into db
 * 
 * @param {Object} param0 
 */
export const saveCanvas = ({code, canvasData}) => {
  let updateConfig = {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ data: { canvasData }})
  }

  fetch(`${BASEURL}/lobbies/${code}/canvas`, updateConfig)
}