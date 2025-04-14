import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { useNavigate } from "react-router-dom";

interface DropdownProps {
  title: string;
  options: string[];
}

const DropdownButton = ({ title, options }: DropdownProps) => {
  const navigate = useNavigate();

  const handleSelect = (option: string) => {
    navigate(`/categories/${option.toLowerCase()}`);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" className="text-white font-semibold text-base">
          {title}
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        {options.map((option) => (
          <DropdownItem key={option} onPress={() => handleSelect(option)}>
            {option}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownButton;
