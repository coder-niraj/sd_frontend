import React from 'react';
import axios from 'axios';

const DownloadButton = ({ imageUrl, imageName }) => {

    const handleDownload = () => {
        axios({
            url: imageUrl,
            method: 'GET',
            responseType: 'blob', // Important
        })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const a = document.createElement('a');
                a.href = url;
                a.download = imageName;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => console.error('Download failed:', error));
    };

    return (
        <button
            style={{
                padding: '10px 20px',
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
            }}
            onClick={handleDownload}
        >
            Download Image
        </button>
    );
};

export default DownloadButton;