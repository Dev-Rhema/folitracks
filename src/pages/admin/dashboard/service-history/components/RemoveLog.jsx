import CTA from '../../../../../components/CTA'
import { HelpCircle } from 'lucide-react'
import usePost from '../../../../../hooks/usePost'
import { useAdminDeleteServiceHistoryMutation } from '../../../../../redux/api/serviceHistoryApiSlice'
import { useNavigate } from 'react-router-dom'


const RemoveLog = ({ onClose, onSuccess, id, open }) => {
  const { postData: deleteServiceHistory, isLoading } = usePost(useAdminDeleteServiceHistoryMutation)
  const navigate = useNavigate()

  if (!open) return null

  const handleRemove = async () => {
    try {
      const res = await deleteServiceHistory(id)
      if (res) {
        onSuccess?.()
        onClose()
        navigate("/admin/dashboard/service-history")
      }
    } catch (error) {
      console.error("Removal failed:", error)
    }
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4">
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-5">
          <HelpCircle size={26} className="text-red-500" strokeWidth={1.5} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Remove Service Log?
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          Are you sure you want to remove this service log? This action cannot be undone.
        </p>

        <div className="flex gap-3 justify-end">
          <CTA
            name="Cancel"
            onClick={onClose}
            color="blue"
            variant="outline"
            disabled={isLoading}
          />

          <CTA
            name="Remove"
            onClick={handleRemove}
            color="red"
            isLoading={isLoading}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  )
}

export default RemoveLog