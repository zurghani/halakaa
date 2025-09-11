import { Paths } from "../Routes";

class ErrorHandler {
    private navigate: ((path: string) => void) | null = null;

    setNavigate(navigateFunction: (path: string) => void) {
        this.navigate = navigateFunction;
    }

    handleError(error: any) {
        if (!this.navigate) {
            console.warn("Navigate function not set for error handler");
            return;
        }

        const statusCode = error?.status || error?.cause?.status;
        
        if (statusCode === 404) {
            this.navigate(Paths.ERROR.NOT_FOUND);
        } else if (statusCode >= 500) {
            this.navigate(Paths.ERROR.SERVER);
        } else if (statusCode >= 400) {
            this.navigate(Paths.ERROR.UNKNOWN);
        }
    }
}

export const errorHandler = new ErrorHandler();