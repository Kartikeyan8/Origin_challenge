import React, { useState, useEffect } from 'react';
import labelsData from './labels.json';
import './User.css';
import image1 from './images/cat1.jpg';
import image2 from './images/cat2.jpg';
import image3 from './images/cat3.jpg';
import image4 from './images/cat4.jpg';
import image5 from './images/cat5.jpg';
import image6 from './images/dog4.jpg';
import image7 from './images/dog1.jpg';
import image8 from './images/dog2.jpg';
import image9 from './images/dog3.jpg';
import image10 from './images/horse1.jpg';
import image11 from './images/horse2.jpg';
import image12 from './images/horse3.jpg';

function NormalDashboard() {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState('');
    
  useEffect(() => {
    const images = [
      { src: image1, label: 'cat',name:'Cat' },
      { src: image2, label: 'cat' ,name:'Cat'},
      { src: image3, label: 'cat' ,name:'Cat'},
        { src: image4, label: 'cat' ,name:'Cat'},
        { src: image5, label: 'cat' ,name:'Cat'},
        { src: image6, label: 'dog' ,name:'Dog'},
        { src: image7, label: 'dog' ,name:'Dog'},
        { src: image8, label: 'dog' ,name:'Dog'},
        { src: image9, label: 'dog' ,name:'Dog'},
        { src: image10, label: 'horse' ,name:'Horse'},
        { src: image11, label: 'horse' ,name:'Horse'},
        { src: image12, label: 'horse' ,name:'Horse'},

    ];
    setImages(images);
    setFilteredImages(images);
  }, []);





  useEffect(() => {
    if (selectedLabel === '') {
      setFilteredImages(images);
    } else {
      const filteredImages = images.filter(image => image.label === selectedLabel);
      setFilteredImages(filteredImages);
    }
    
  }, [images, selectedLabel]);

 
  
const handleAddLabel = (imageIndex) => {
  const availableLabels = labelsData.map(label => label.name);
//   console.log(availableLabels);
  const newLabel = prompt(`Enter a new label from the following list: ${availableLabels.join(', ')}`);
  if (newLabel && availableLabels.includes(newLabel)) {
    setImages(prevImages => {
      const updatedImages = [...prevImages];
      const image = updatedImages[imageIndex];
      const labels = image.label.split(',');
      if (labels.includes(newLabel)) {
        alert(`Label "${newLabel}" already exists for this image.`);
      } else {
        image.label += `,${newLabel}`;
      }
      return updatedImages;
    });
  }
};


    // console.log(labelsData)
  const handleDeleteLabel = (index, labelToDelete) => {
    // console.log(index, labelToDelete)
    setImages(prevImages => {
      const updatedImages = [...prevImages];
      updatedImages[index].label = updatedImages[index].label
        .split(',')
        .filter(label => label !== labelToDelete)
        .join(',');
      return updatedImages;
    });
  };

  const handleLabelClick = (label) => {
  setSelectedLabel(label);
  if (label === '') {
    setFilteredImages(images);
  } else {
    const filteredImages = images.filter(image => image.label === label);
    setFilteredImages(filteredImages);
  }
};

  const labels = labelsData;
  return (
    <div className="NormalDashboard">
      <div className="filter-nav">
        <div className="nav-item" onClick={() => setSelectedLabel('')}>
          All &ensp;
        </div>
        {labels.map((label, index) => (
            <div key={index} className="nav-item" onClick={() => handleLabelClick(label.name)}>
                {label.name} {label.count} &ensp; 
                </div>
        ))}
      </div>
        
      <div className="image-grid">
        {filteredImages.map((image, index) => (
          <div key={index} className="image-wrapper">
            <img src={image.src} alt={`Image ${index}`} />
            
            <div className="label-checkboxes">
            
              {image.label.split(',').map((label, labelIndex) => (
                <div key={`${index}-${labelIndex}`} className="label-checkbox">
                 
                  <span> Labels : {label}</span>
                  <button className="delete-label" onClick={() => handleDeleteLabel(index, label)}>X</button>
                </div>
              ))}
              <button className="add-label" onClick={() => handleAddLabel(index)}>Add Label</button>
            </div>
            </div>
        ))}
        </div>
    </div>
    );
}

export default NormalDashboard;
