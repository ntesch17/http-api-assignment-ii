// Note this object is purely in memory
// When node shuts down this will be cleared.
// Same when your heroku app shuts down from inactivity
// We will be working with databases in the next few weeks.
const users = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  return respondJSON(request, response, 200, responseJSON);
  //return respondJSONMeta(request,response,200);
};

const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Name and Age are both required',
  };

  if(!body.name || !body.age){
    responseJSON.id = 'missingParams';
    return respondJSON(request,response,400,responseJSON);
  }

  let responseCode = 201;

  if(users[body.name]){
    responseCode = 204;
  }
  else{
    users[body.name] = {};
    users[body.name].name = body.name;
  }

  users[body.name].age = body.age;

  if(responseCode === 201){
    responseJSON.message = 'Created Successfuly!';
    return respondJSON(request,response,responseCode,responseJSON);
  }

  return respondJSONMeta(request,response,responseCode);
};

const notFound = (request, response, params, acceptedTypes) => {
  const responsesMessage = {
    message: 'Message: The page you are looking for was not found.',
    id: 'ID: notFound',
  };

  

 
  respondJSON(request, response, 404, responsesMessage);
  return respondJSONMeta(request, response, 404);
};

module.exports = {
  getUsers,
  addUser,
  notFound
};
