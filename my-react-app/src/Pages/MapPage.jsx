import Sidebar from '../components/Sidebar';
import MapView from '../components/MapView';

const MapPage = ({ nodes }) => {
  

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <Sidebar nodes={nodes} />
      <MapView nodes={nodes} />
    </div>
  );
};

export default MapPage;
