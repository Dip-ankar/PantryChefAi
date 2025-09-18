import apiClient from './apiClient';

export const generateRecipe = (preferences) => {

  const token = localStorage.getItem('token');

  return apiClient.post('/recipes/generate', preferences, {
    headers: {

      Authorization: `Bearer ${token}`
    }
  });
};



export const generateIdeas = (ingredients) => {
  const token = localStorage.getItem('token');
  return apiClient.post('/recipes/ideas', { ingredients }, { 
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};


export const analyzeImage = (imageData) => {
  const token = localStorage.getItem('token');
  

  const formData = new FormData();
  formData.append('ingredientImage', imageData); 

  return apiClient.post('/recipes/analyze-image', formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data', 
    }
  });
};