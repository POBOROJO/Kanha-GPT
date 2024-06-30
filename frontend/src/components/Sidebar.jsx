import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Sidebar = () => {
  return (
    <Card className="flex h-full flex-col gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>What is the meaning of life?</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>What is the meaning of life?</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>What is the meaning of life?</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
      </Card>
    </Card>
  );
};
export default Sidebar;
