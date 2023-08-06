const rawBodyBuffer = (req, res, next) => {
    if (req.method === 'POST' && req.headers['stripe-signature']) {
      req.rawBody = Buffer.from('');
      req.on('data', (chunk) => {
        req.rawBody = Buffer.concat([req.rawBody, chunk]);
      });
  
      req.on('end', () => {
        next();
      });
    } else {
      next();
    }
  };
  export default rawBodyBuffer;