import { Dialog } from "@material-ui/core"

export const Spinner = ({open}) => {
  return (
    <Dialog open={open}>
      <div className="spinner"></div>
    </Dialog>
  )
}