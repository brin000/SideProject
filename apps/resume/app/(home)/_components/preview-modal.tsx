import { Button } from "@repo/ui/components/button"
import { Dialog, DialogTrigger } from "@repo/ui/components/dialog"

const PreviewModal = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button>Open</Button>
        </DialogTrigger>
      </Dialog>
    </>
  )
}

export default PreviewModal
