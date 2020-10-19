const BASEURL = "http://localhost:8000"

export const fetchCanvas = code => {
  return fetch(`${BASEURL}/lobbies/${code}/canvas`)
    .then(response=>response.json())
}

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