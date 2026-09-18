import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { readDisasters, readReliefCenters, readRequests, readResources, readVolunteers, subscribeToStore, writeCollection } from '../../services/localStore';

const initialMapLocations = {
    disasters: [{ id: 'map-disaster-1', name: 'Wayanad Landslide', type: 'Landslide', status: 'Active', location: 'Meppadi Sector', lat: 11.55, lng: 76.10 }],
    reliefCenters: [{ id: 'map-center-1', name: 'Kochi Relief Center', status: 'Active', location: 'Kochi', lat: 9.97, lng: 76.28 }],
    resources: [{ id: 'map-resource-1', name: 'Central Relief Hub', status: 'Available', location: 'Ernakulam', lat: 10.02, lng: 76.31 }]
};

const knownCoordinates = [
    { terms: ['wayanad', 'meppadi', 'chooralmala'], position: [11.55, 76.10] },
    { terms: ['alappuzha', 'kuttanad'], position: [9.49, 76.32] },
    { terms: ['kochi', 'ernakulam'], position: [9.97, 76.28] },
    { terms: ['kozhikode'], position: [11.25, 75.78] },
    { terms: ['changanassery'], position: [9.44, 76.54] },
    { terms: ['idukki', 'periyar'], position: [9.85, 76.97] }
];

const getCoordinates = item => {
    const latitude = Number(item.lat ?? item.latitude);
    const longitude = Number(item.lng ?? item.longitude);
    if (Number.isFinite(latitude) && Number.isFinite(longitude)) return [latitude, longitude];
    const searchableText = `${item.name || ''} ${item.location || ''} ${item.address || ''}`.toLowerCase();
    return knownCoordinates.find(entry => entry.terms.some(term => searchableText.includes(term)))?.position || null;
};

const withPosition = (item, type, details = {}) => {
    const position = getCoordinates(item);
    return position ? { ...item, ...details, type, position } : null;
};


const LocationMap = () => {
    const [requests, setRequests] = useState(readRequests());
    const [disasters, setDisasters] = useState(readDisasters());
    const [resources, setResources] = useState(readResources());
    const [reliefCenters, setReliefCenters] = useState(readReliefCenters());
    const [volunteers, setVolunteers] = useState(readVolunteers());
    useEffect(() => {
        if (!readDisasters().length && !readReliefCenters().length && !readResources().length && !readRequests().length && !readVolunteers().length) {
            writeCollection('disasters', initialMapLocations.disasters);
            writeCollection('reliefCenters', initialMapLocations.reliefCenters);
            writeCollection('resources', initialMapLocations.resources);
        }
        return subscribeToStore(() => { setRequests(readRequests()); setDisasters(readDisasters()); setResources(readResources()); setReliefCenters(readReliefCenters()); setVolunteers(readVolunteers()); });
    }, []);
    const disasterMarkers = disasters.map(disaster => withPosition(disaster, 'Disaster', { details: `Status: ${disaster.status || 'Unknown'}` })).filter(Boolean);
    const resourceMarkers = resources.map(resource => withPosition(resource, 'Resource Hub', { details: `Status: ${resource.status || 'Unknown'}` })).filter(Boolean);
    const centerMarkers = reliefCenters.map(center => withPosition(center, 'Relief Center', { details: `Status: ${center.status || 'Unknown'}` })).filter(Boolean);
    const requestMarkers = requests.map(request => withPosition(request, 'Help Request', { name: request.id, details: `Status: ${request.status || 'Pending'} | ${request.type || 'Assistance'}` })).filter(Boolean);
    const assignmentMarkers = volunteers.map(volunteer => volunteer.assignment && withPosition({ ...volunteer.assignment, name: volunteer.assignment.requestId }, 'Volunteer Assignment', { id: `assignment-${volunteer.id}`, details: `Volunteer: ${volunteer.userName} | Response: ${volunteer.assignment.response || 'Pending'}` })).filter(Boolean);
    const markers = [...disasterMarkers, ...centerMarkers, ...resourceMarkers, ...requestMarkers, ...assignmentMarkers];
    const mapCenter = markers.length ? markers[0].position : [0, 0];

    return (
        <div>
            <PageHeader title="Location Map" description="View active disasters, help requests, relief centers, and resource hubs." />
            {markers.length ? <div className="card" style={{ overflow: 'hidden' }}>
                <MapContainer center={mapCenter} zoom={7} style={{ height: '560px', width: '100%', zIndex: 0 }}>
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" attribution="&copy; OpenStreetMap contributors" />
                    {markers.map(item => <Marker key={`${item.type}-${item.id}`} position={item.position}><Popup><strong>{item.name || item.id}</strong><br />{item.type}<br />{item.location || item.address || 'Location from saved coordinates'}<br />{item.details}</Popup></Marker>)}
                </MapContainer>
            </div> : <div className="card"><div className="card-body"><p style={{ color: 'var(--text-secondary)' }}>No saved locations are available yet.</p></div></div>}
        </div>
    );
};

export default LocationMap;
