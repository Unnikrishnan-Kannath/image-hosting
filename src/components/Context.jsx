import React from 'react';


export const ImageContext = React.createContext({
  images:[],
  update: () => {}
});

const mkWithContext = (Context, ctxPropName) => (Component) =>
  React.forwardRef((props, ref) => {
    const wrappedComponent = (ctx) => {
      const newProps = {
        ...props,
        [`ctx_${ctxPropName}`]: ctx,
        ref: ref,
      };
      return React.createElement(Component, newProps);
    };
    return (
      <Context.Consumer>
        {wrappedComponent}
      </Context.Consumer>
    );
  });

  export const withImageContext = mkWithContext(ImageContext, 'image');