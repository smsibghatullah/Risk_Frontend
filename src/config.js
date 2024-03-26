export  const getSecrets =   {
     API_URL:"http://localhost:8000",
     token : () => { return "Token "+" "+localStorage.getItem('token'); }
}; 
    
