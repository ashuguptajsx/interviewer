"use server"
import { db } from "@/firebase/admin"
import { cookies } from "next/headers"
import { auth } from "@/firebase/admin"

export async function signUp(params: SignUpParams){
    const {uid, name, email, password} = params 

    try {
        const userRecord = await db.collection("users").doc(uid).get();

        if(userRecord.exists){
            return {
                success: false,
                message: "User already exists"
            }
        }

        await db.collection("users").doc(uid).set({
            name,
            email,
            
        })
        return {
            success : true,
            message: "Account created succesfully. Please sign in."
        }
       
    }
    catch (error: any) {     
        console.error("Error creating user:", error)
        
        if(error.code  === "auth/email-already-exists"){
            return{
                success : false,
                message : "Email already exists"
            }
        }
        return{
            success: false,
            messsage : "Error creating user"
        }
       
    }
}

export async function signIn(params: SignInParams){
    const {email, idToken} = params;
    try {
        const userRecord = await auth.getUserByEmail(email);

        if(!userRecord){
            return {
                success: false,
                message: "User not found"
            }
        }

        await setSessionCookie(idToken); 

         
    } catch (error) {
        console.log(error);

        return {
            success : false,
            message : "Error signing in"
        }

    }
}

export async function setSessionCookie(idToken : string){
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn : 60*60*24*7*1000,
    })

    cookieStore.set("session", sessionCookie, {
        httpOnly : true,
        path : "/",
        secure : process.env.NODE_ENV === "production",
        maxAge : 60*60*24*7*1000,
        sameSite : "lax",
    })
}