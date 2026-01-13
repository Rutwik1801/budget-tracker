import { Button } from '../base';

function FlatButton({ children, onPress }) {
  return (
    <Button
      mode="flat"
      onPress={onPress}
      className="py-1.5 px-3"
    >
      {children}
    </Button>
  );
}

export default FlatButton;