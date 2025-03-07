import Header from "components/Header";
import ProtectedRoute from "components/ProtectedRoute";

export default function Blog(){
    return (
        <ProtectedRoute>
            <div>
                <Header />
            </div>
        </ProtectedRoute>
    )
}