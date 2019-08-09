import routes from './client/Routes';
import { renderToString } from 'react-dom/server';
//重要是要用到StaticRouter
import { StaticRouter } from 'react-router-dom'; 
import { Provider } from 'react-redux';
import { getStore } from './client/store'
import React from 'react'
import Home from './client/Home';
import { renderRoutes } from 'react-router-config';

export const render = (req) => {
  //构建服务端的路由
  const content = renderToString(
    <Provider store={getStore()}>
      <StaticRouter location={req.path} >
      <div>
      {renderRoutes(routes)}
      </div>
      </StaticRouter>
    </Provider>
  );
  return `
    <html>
      <head>
        <title>ssr</title>
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.context = {
            state: ${JSON.stringify(getStore())}
          }
        </script>
        <script  src="/public/index.js"></script>
      </body>
    </html>
  `
}