import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { React, useEffect, useState, useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import UserService from '../../api/UserService';
import { UserInfoContext } from '../../context/UserInfoContext';
import { NotificationContext } from '../../context/NotificationContext';
import { usePosition } from '../../hooks/usePosition';

import './MyMap.css'
import { FriendContext } from '../../context/FriendContext';

const MyMap = () => {
  const [zoom, setZoom] = useState(15);
  const [{ chatId, setChatId }, { chatBarVisible, setChatBarVisible }, { chatName, setChatName }] = useContext(ChatContext)
  const { userInfo, setUserInfo } = useContext(UserInfoContext)
  const { notification, setNotification } = useContext(NotificationContext)

  const { latitude, longitude, error } = usePosition();

  const [friends, setFriends] = useContext(FriendContext)

  const defaultPosition = [
    latitude ? latitude : 10,
    longitude ? longitude : 10
  ]

  useEffect(() => {
    // console.log(latitude, longitude)

    setInterval(
      () => {
        UserService.postUserLocationByUserId(userInfo.login, latitude, longitude)
          .then(res => {
            if (!res) {
              setNotification('Не получилось отправить данные о своей позиции');
            }
            else {
              setNotification('Успешно отправили данные о своей позиции');
            }
          })
          .catch(e => setNotification('Не получилось получить данные о местоположении пользователей'))
      }, 5000
    )

    // UserService.getFriendsLocation(userInfo.login)
    //   .then(friendsLocations => {
    //     if (friendsLocations) {
    //       setFriends(friendsLocations);
    //     }
    //     else {
    //       setNotification('Не получилось получить данные о местоположении пользователей');
    //     }
    //   })
    //   .catch(e => setNotification('Не получилось получить данные о местоположении пользователей'))
  }, [latitude, longitude])

  const handleClick = (friend) => {
    setChatBarVisible(true)
    setChatName(friend.name)
  }

  return (
    <div className='map-container'>
      <YMaps>
        <Map className='map' defaultState={{ center: defaultPosition, zoom: zoom }} >
          {
            !error &&
            <Placemark className='placemark'
              geometry={[latitude, longitude]}

              properties={{
                iconCaption: 'Me',
              }}

              options={{
                iconColor: 'red'
              }}
            />
          }
          {
            friends.map(friend => {
              return (
                <Placemark
                  key={friend.id}
                  geometry={[friend.latitude, friend.longitude]}
                  properties={{
                    iconCaption: friend.login,
                  }}
                  onClick={() => handleClick(friend)}
                />
              )
            })
          }
        </Map>
      </YMaps>
    </div>
  );
}

export default MyMap


// import React, { useEffect, useRef } from 'react';
// import './MyMap.css';
// import { Map, View } from 'ol';
// import FullScreen from 'ol/control/FullScreen';
// import olms from 'ol-mapbox-style';
// import { transform } from 'ol/proj';

// const MyMap = ({
//   mapIsReadyCallback /* To be triggered when a map object is created */,
// }) => {
//   const mapContainer = useRef(null);

//   useEffect(() => {
//     const initialState = {
//       lng: 11,
//       lat: 49,
//       zoom: 4,
//     };

//     // This API key is for use only in stackblitz.com
//     // Get your Geoapify API key on https://www.geoapify.com/get-started-with-maps-api
//     // The Geoapify service is free for small projects and the development phase.
//     const myAPIKey = '18c85a44a76042788847e2fb74d27386';
//     const mapStyle = 'https://maps.geoapify.com/v1/styles/positron/style.json';

//     olms(mapContainer.current, `${mapStyle}?apiKey=${myAPIKey}`).then((map) => {
//       map
//         .getView()
//         .setCenter(
//           transform(
//             [initialState.lng, initialState.lat],
//             'EPSG:4326',
//             'EPSG:3857'
//           )
//         );
//       map.getView().setZoom(initialState.zoom);

//       mapIsReadyCallback(map);
//     });
//   }, [mapContainer.current]);

//   return <div className="map-container" ref={mapContainer}></div>;
// };

// export default MyMap;
